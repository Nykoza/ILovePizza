import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from '../src/user/dto';
import { CreatePizzaOrderDto, EditPizzaOrderDto } from '../src/pizza-order/dto';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = { email: 'nicolas@google.lan', password: '123' };

    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });

      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });

      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });

      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });

      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({ Authorization: `Bearer $S{userAt}` })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      const dto: EditUserDto = {
        firstName: 'Nicolas',
        email: 'nico@google.lan',
      };

      it('should edit the user', () => {
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({ Authorization: `Bearer $S{userAt}` })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });

  describe('PizzaOrders', () => {
    describe('Get empty pizza-orders', () => {
      it('should get pizza-orders', () => {
        return pactum
          .spec()
          .get('/pizzaorders')
          .withHeaders({ Authorization: `Bearer $S{userAt}` })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create pizza-order', () => {
      const dto: CreatePizzaOrderDto = { name: 'BBQ', extra: 'Eggs' };
      it('Should create pizza-order', () => {
        return pactum
          .spec()
          .post('/pizzaorders')
          .withHeaders({ Authorization: `Bearer $S{userAt}` })
          .withBody(dto)
          .expectStatus(201)
          .stores('pizzaOrderId', 'id');
      });
    });

    describe('Get pizza-orders', () => {
      it('should get pizza-orders', () => {
        return pactum
          .spec()
          .get('/pizzaorders')
          .withHeaders({ Authorization: `Bearer $S{userAt}` })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });

    describe('Get pizza-order by id', () => {
      it('Should get pizzaOder by id', () => {
        return pactum
          .spec()
          .withPathParams('id', '$S{pizzaOrderId}')
          .get('/pizzaorders/{id}')
          .withHeaders({ Authorization: `Bearer $S{userAt}` })
          .expectStatus(200)
          .expectBodyContains('$S{pizzaOrderId}');
      });
    });

    describe('Edit pizza-order by id', () => {
      const dto: EditPizzaOrderDto = { name: 'Hawaiian', extra: 'Eggs' };

      it('should edit pizza-order', () => {
        return pactum
          .spec()
          .withPathParams('id', '$S{pizzaOrderId}')
          .withBody(dto)
          .patch('/pizzaorders/{id}')
          .withHeaders({ Authorization: `Bearer $S{userAt}` })
          .expectStatus(200)
          .expectBodyContains(dto.name)
          .expectBodyContains(dto.extra);
      });
    });

    describe('Delete pizza-order', () => {
      it('should delete pizza-order', () => {
        return pactum
          .spec()
          .withPathParams('id', '$S{pizzaOrderId}')
          .delete('/pizzaorders/{id}')
          .withHeaders({ Authorization: `Bearer $S{userAt}` })
          .expectStatus(204);
      });

      it('should get empty pizza-orders', () => {
        return pactum
          .spec()
          .get('/pizzaorders')
          .withHeaders({ Authorization: `Bearer $S{userAt}` })
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
  });
});
