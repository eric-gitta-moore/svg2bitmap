import { Express } from 'express';
import { index } from '../controller';

export default function setup({ app }: { app: Express }) {
  app.get('/', index);
}
