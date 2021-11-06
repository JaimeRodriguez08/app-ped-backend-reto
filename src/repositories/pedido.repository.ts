import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pedido, PedidoRelations, Persona, Restaurante} from '../models';
import {PersonaRepository} from './persona.repository';
import {RestauranteRepository} from './restaurante.repository';

export class PedidoRepository extends DefaultCrudRepository<
  Pedido,
  typeof Pedido.prototype.id,
  PedidoRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Pedido.prototype.id>;

  public readonly restaurante: HasOneRepositoryFactory<Restaurante, typeof Pedido.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('RestauranteRepository') protected restauranteRepositoryGetter: Getter<RestauranteRepository>,
  ) {
    super(Pedido, dataSource);
    this.restaurante = this.createHasOneRepositoryFactoryFor('restaurante', restauranteRepositoryGetter);
    this.registerInclusionResolver('restaurante', this.restaurante.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
