import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Pedido,
  Restaurante,
} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoRestauranteController {
  constructor(
    @repository(PedidoRepository) protected pedidoRepository: PedidoRepository,
  ) { }

  @get('/pedidos/{id}/restaurante', {
    responses: {
      '200': {
        description: 'Pedido has one Restaurante',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Restaurante),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Restaurante>,
  ): Promise<Restaurante> {
    return this.pedidoRepository.restaurante(id).get(filter);
  }

  @post('/pedidos/{id}/restaurante', {
    responses: {
      '200': {
        description: 'Pedido model instance',
        content: {'application/json': {schema: getModelSchemaRef(Restaurante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pedido.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restaurante, {
            title: 'NewRestauranteInPedido',
            exclude: ['id'],
            optional: ['pedidoId']
          }),
        },
      },
    }) restaurante: Omit<Restaurante, 'id'>,
  ): Promise<Restaurante> {
    return this.pedidoRepository.restaurante(id).create(restaurante);
  }

  @patch('/pedidos/{id}/restaurante', {
    responses: {
      '200': {
        description: 'Pedido.Restaurante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Restaurante, {partial: true}),
        },
      },
    })
    restaurante: Partial<Restaurante>,
    @param.query.object('where', getWhereSchemaFor(Restaurante)) where?: Where<Restaurante>,
  ): Promise<Count> {
    return this.pedidoRepository.restaurante(id).patch(restaurante, where);
  }

  @del('/pedidos/{id}/restaurante', {
    responses: {
      '200': {
        description: 'Pedido.Restaurante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Restaurante)) where?: Where<Restaurante>,
  ): Promise<Count> {
    return this.pedidoRepository.restaurante(id).delete(where);
  }
}
