import { Express } from 'express';
import { svg2bitmap } from '../controller/svg2bitmap';

export default function setup({ app }: { app: Express }) {
  app.all('/svg2bitmap', svg2bitmap);
}
