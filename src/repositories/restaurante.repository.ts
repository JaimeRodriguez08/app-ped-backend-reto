import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Restaurante, RestauranteRelations} from '../models';

export class RestauranteRepository extends DefaultCrudRepository<
  Restaurante,
  typeof Restaurante.prototype.id,
  RestauranteRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Restaurante, dataSource);
  }
}
