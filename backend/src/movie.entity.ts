import slugify from 'slugify';
import { BeforeInsert, BeforeUpdate, Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

import { IMovie } from './movie.interface';

@Entity()
export class Movie implements IMovie {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  logoUrl: string;

  @Column()
  slug: string;

  @Column()
  rating: number;

  @BeforeInsert()
  @BeforeUpdate()
  setSlug() {
    this.slug = slugify(this.title, { lower: true });
  }
}
