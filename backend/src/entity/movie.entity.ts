import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Tag } from './tag.entity';

const slug = require('limax');
@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  logoUrl: string;

  @Column()
  slug: string;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  rating: number;

  @BeforeInsert()
  @BeforeUpdate()
  setSlug() {
    this.slug = slug(this.title);
  }

  @ManyToMany(() => Tag, (tag) => tag.movies)
  @JoinTable()
  tags: Promise<Tag[]>;
}
