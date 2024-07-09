import { screen } from "@testing-library/react"
import user from "@testing-library/user-event";
import Sidebar from "./index"
import { customRender } from "../../utils/customRender";

describe('<Sidebar />', () => {
  user.setup();
  it('should the nav items ', async () => {
    customRender(<Sidebar/>)
    const startItem = screen.getByRole('link', { name: /Inicio/i });
    const includeScheduleItem = screen.getByRole('link', { name: /Cadastrar Agendamento/i });
    expect(startItem).toBeInTheDocument();
    expect(includeScheduleItem);
  })
})