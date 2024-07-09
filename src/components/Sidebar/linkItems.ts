import { IconType } from "react-icons"
import { FiHome, FiTrendingUp } from "react-icons/fi"

interface ILinkItemProps {
    name: string
    icon: IconType
    href: string
}
export const LinkItems: Array<ILinkItemProps> = [
    { name: 'Inicio', icon: FiHome, href: '/'  },
    { name: 'Cadastrar Agendamento', icon: FiTrendingUp, href: 'include' },
  ]