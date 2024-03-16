import { createPersonalizations } from './create-personalizations';
import { createFlavours } from './create-flavours';
import { createSizes } from './create-sizes';

const load = async () => {
  await createPersonalizations();
  await createFlavours();
  await createSizes();
};

load();
