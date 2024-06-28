
import { IconHelp, IconCertificate, IconLink } from '@tabler/icons-react';


const other = {
  id: 'dialect',
  title: 'Dialect',
  type: 'group',
  children: [
    {
      id: 'registery',
      title: 'Registery',
      type: 'item',
      url: 'https://dial.to/register',
      icon: IconCertificate,
      external: true,
      target: true
    },
    {
      id: 'blink',
      title: 'Blink',
      type: 'item',
      url: 'https://actions.dialect.to/',
      icon: IconLink,
      external: true,
      target: true
    },
    {
      id: 'help',
      title: 'Help',
      type: 'item',
      url: 'https://docs.dialect.to/documentation',
      icon: IconHelp,
      external: true,
      target: true
    }
  ]
};

export default other;
