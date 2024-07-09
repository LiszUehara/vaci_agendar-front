import { render, screen } from "@testing-library/react"
import user from "@testing-library/user-event";
import Sidebar from "./index"

describe('<Sidebar />', () => {
  user.setup();
  it('should the nav items ', async () => {
    render(<Sidebar/>)
    const startItem = screen.getByRole('link', { name: /Inicio/i });
    const includeScheduleItem = screen.getByRole('link', { name: /Cadastrar Agendamento/i });
    expect(startItem).toBeInTheDocument();
    expect(includeScheduleItem);
  })
  it('change background color', async () => {
    render(<Sidebar/>)
    const buttonChangeColor = screen.getByLabelText('change color mode');
    await user.click(buttonChangeColor);
    expect(buttonChangeColor);
  })
})