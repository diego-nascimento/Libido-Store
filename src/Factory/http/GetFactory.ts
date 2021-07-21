import { GetData, GetInfra } from './Protocols'

export const GetFactory = () => {
  const GetInfraInfra = new GetInfra()
  return new GetData(GetInfraInfra)
}
