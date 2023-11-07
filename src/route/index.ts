import { Express } from 'express';
import setupSvg from './svg2bitmap';
import setupIndex from './default';

export default function setupRoute({ app }: { app: Express }) {
  setupSvg({ app });
  setupIndex({ app });
}
