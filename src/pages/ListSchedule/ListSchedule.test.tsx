import { fireEvent, screen, waitForElementToBeRemoved } from "@testing-library/react"
import user from "@testing-library/user-event";
import { ListSchedule } from "./index"
import { customRender } from "../../utils/customRender";
import fetcher from '../../services/api'

jest.mock('../../services/api')
jest.mock('../../utils/env', () => ({VITE_BACKEND_URL: ''}))

//@ts-ignore
global.JSON = {
  parse: (_value: string)=> ({}),
  stringify: (_value: any)=> '',
};

const mockListItems = [{
  id: "2f3f88f2-731f-4fd6-bcb0-a892fbb4cced",
  dateTime: new Date('11/12/2012'),
  status: "unrealized",
  note: "",
  patient: {
      id: "bb193fa2-c955-4452-937e-7c543226f6a2",
      name: "Lisandra",
      birthDate: new Date('12/12/2012'),
      cpf: "827.792.260-48",
  }
},
{
  id: "2f3f88f2-731f-4fd6-bcb0-a792fbb4cced",
  dateTime: new Date(),
  status: "cancelled",
  note: "",
  patient: {
      id: "bb193fa2-c955-4452-937e-7c543226f692",
      name: "John",
      birthDate: new Date(),
      cpf: "827.792.260-58",
  }
},
{
  id: "2f3f88f2-731f-3fd6-bcb0-a892fbb4cced",
  dateTime: new Date(),
  status: "completed",
  note: "",
  patient: {
      id: "bb193fa2-c955-4452-937e-7c543226fka2",
      name: "Carlos",
      birthDate: new Date(),
      cpf: "827.792.260-68",
  }
},
{
  id: "2f3f88f2-731f-3fd6-bcb0-h892fbb4cced",
  dateTime: new Date(),
  status: "other",
  note: "",
  patient: {
      id: "bb193fa2-c955-4452-937e-7c543228fka2",
      name: "Fernanda",
      birthDate: new Date(),
      cpf: "827.792.260-88",
  }
},
]

const MockSerch = [
{
  id: "2f3f88f2-731f-4fd6-bcb0-a792fbb4cced",
  dateTime: new Date(),
  status: "cancelled",
  note: "",
  patient: {
      id: "bb193fa2-c955-4452-937e-7c543226f692",
      name: "Ana",
      birthDate: new Date(),
      cpf: "123.792.260-58",
  }
}
]

describe('<ListSchedule />', () => {
  user.setup();
  it('Render element of list', async () => {
    fetcher.get = jest.fn().mockResolvedValue({items: mockListItems})
    customRender(<ListSchedule/>)
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i))
    const name = screen.getByText(/Lisandra/i);
    const cpf = screen.getByText(/827.792.260-48/i);
    const birthDate = screen.getByText("12/12/2012");
    const timeDate = screen.getByText("12/11/2012, 00:00");
    const status = screen.getByText("Não Realizado");

    expect(name).toBeInTheDocument();
    expect(cpf).toBeInTheDocument();
    expect(birthDate).toBeInTheDocument();
    expect(timeDate).toBeInTheDocument();
    expect(status).toBeInTheDocument();
  })
  it('Open Modal', async () => {
    fetcher.get = jest.fn().mockResolvedValue({items: mockListItems})
    customRender(<ListSchedule/>)
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i))
    const button = screen.getByRole("button", {name: "editar agendamento Carlos"});
    fireEvent.click(button)
    const modal = screen.getByText("Atualização de Agendamento");

    expect(modal).toBeInTheDocument();
  })
  it('Render error', async () => {
    fetcher.get = jest.fn().mockResolvedValue({error: true, cause : "Error"})
    customRender(<ListSchedule/>)
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i))
    const error = screen.getByText("Error");

    expect(error).toBeInTheDocument();
  })
  it('Render Search', async () => {
    fetcher.get = jest.fn().mockResolvedValue({items: mockListItems})
    customRender(<ListSchedule/>)
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i))
    let name1 = screen.getByText(/Lisandra/i);
    expect(name1).toBeInTheDocument();
    let inputCpfSearch = screen.getByRole("textbox", {name: /Pesquisa cpf/i});
    fetcher.get = jest.fn().mockResolvedValue({items: MockSerch})
    fireEvent.change(inputCpfSearch, { target: { value: '123' } });
    await waitForElementToBeRemoved(() => screen.getByText(/Lisandra/i))
    let name2 = screen.getByText(/Ana/i);
    expect(name2).toBeInTheDocument();
  })
  it('Render Search With Error', async () => {
    fetcher.get = jest.fn().mockResolvedValue({items: mockListItems})
    customRender(<ListSchedule/>)
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i))
    let name1 = screen.getByText(/Lisandra/i);
    expect(name1).toBeInTheDocument();
    let inputCpfSearch = screen.getByRole("textbox", {name: /Pesquisa cpf/i});
    fetcher.get = jest.fn().mockResolvedValue({error: true, cause: "Error"})
    fireEvent.change(inputCpfSearch, { target: { value: '123' } });
    await waitForElementToBeRemoved(() => screen.getByText(/Carregando.../i))
    let errorText = screen.getByText(/Error/i);
    expect(errorText).toBeInTheDocument();
  })
})