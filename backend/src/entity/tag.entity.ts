import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Movie } from './movie.entity';

const slug = require('limax');
@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @BeforeInsert()
  @BeforeUpdate()
  setSlug() {
    this.slug = slug(this.name);
  }

  @ManyToMany(() => Movie, (movie) => movie.tags)
  //@Field(() => [Movie])
  movies: Movie[];
}
