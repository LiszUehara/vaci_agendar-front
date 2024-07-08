import { IconType } from "react-icons"
import { FiHome, FiTrendingUp } from "react-icons/fi"

interface ILinkItemProps {
    name: string
    icon: IconType
}

export const LinkItems: Array<ILinkItemProps> = [
    { name: 'Inicio', icon: FiHome },
    { name: 'Cadastrar Agendamento', icon: FiTrendingUp },
  ]