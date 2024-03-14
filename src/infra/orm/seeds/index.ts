import { createPersonalizations } from './create-personalizations';
import { createFlavours } from './create-flavours';

const load = async () => {
  await createPersonalizations();
  await createFlavours();
};

load();
