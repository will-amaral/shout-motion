import {
  IoBarbell,
  IoCalendar,
  IoCash,
  IoChatbubbles,
  IoHome,
  IoMedkit,
  IoPeople,
  IoSettings,
} from 'react-icons/io5'

const menu = [
  {
    to: '/',
    text: 'Home',
    icon: IoHome,
    allowed_roles: ['student', 'instructor', 'admin', 'superadmin'],
  },
  {
    to: '/usuarios',
    text: 'Usuários',
    icon: IoPeople,
    allowed_roles: ['admin', 'superadmin'],
  },
  {
    to: '/exercicios',
    text: 'Exercícios',
    icon: IoBarbell,
    allowed_roles: ['instructor', 'superadmin'],
  },
  {
    to: '/aulas',
    text: 'Aulas',
    icon: IoCalendar,
    allowed_roles: ['student', 'instructor', 'admin', 'superadmin'],
  },
  {
    to: '/financeiro',
    text: 'Financeiro',
    icon: IoCash,
    allowed_roles: ['student', 'instructor', 'admin', 'superadmin'],
  },
  {
    to: '/mensagens',
    text: 'Mensagens',
    icon: IoChatbubbles,
    allowed_roles: ['student', 'instructor', 'admin', 'superadmin'],
  },
  {
    to: '/relatorios',
    text: 'Relatórios de Saúde',
    icon: IoMedkit,
    allowed_roles: ['student', 'superadmin'],
  },
  {
    to: '/configuracoes',
    text: 'Configurações',
    icon: IoSettings,
    allowed_roles: ['student', 'instructor', 'admin', 'superadmin'],
  },
]

export default menu
