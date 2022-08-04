
import { randomUUID } from 'crypto';

const agendas = [
  {id: randomUUID(), data: setDate (0, 0, 4), quantidadePessoas: 3, status: 'disponivel'},
  {id: randomUUID(), data: setDate (0, 0, 3), quantidadePessoas: 2, status: 'disponivel'},
  {id: randomUUID(), data: setDate (0, 0, 8), quantidadePessoas: 4, status: 'disponivel'},
  {id: randomUUID(), data: setDate (0, 1, 0), quantidadePessoas: 2, status: 'disponivel'},
  {id: randomUUID(), data: setDate (0, 1, 2), quantidadePessoas: 5, status: 'disponivel'},
  {id: randomUUID(), data: setDate (5, 0, 0), quantidadePessoas: 6, status: 'disponivel'},
  {id: randomUUID(), data: setDate (6, 0, 0), quantidadePessoas: 2, status: 'disponivel'},
  {id: randomUUID(), data: setDate (2, 0, 0), quantidadePessoas: 2, status: 'disponivel'},
  {id: randomUUID(), data: setDate (1, 0, 0), quantidadePessoas: 10, status: 'disponivel'},
  {id: randomUUID(), data: setDate (0, 1, 0), quantidadePessoas: 7, status: 'disponivel'},
  {id: randomUUID(), data: setDate (3, 0, 0), quantidadePessoas: 8, status: 'disponivel'}
]

function setDate (addDay, addMonth, addHour){
  let date, currentMonth, currentHour
  date = new Date()
  currentMonth = date.getMonth()
  currentHour = date.getHours()

  date = addMonth > 0 ? new Date(date.setMonth(addMonth + currentMonth)) : date
  date = addDay > 0 ? new Date (date.setDate(addDay)) : date
  date = addHour > 0? new Date (date.setHours(addHour, 0)) : new Date (date.setHours(currentHour, 0))

  return date
}

async function listDatas(req, res, next) {
  try {
    const {quantidadePessoas} = req.query
    const datas = agendas.filter((agenda)=> agenda.status === 'disponivel' && quantidadePessoas <= agenda.quantidadePessoas)
      .map(({data}) => {return {data}})
      .sort(function (a, b) {
        return a.data - b.data;
      })

    return res.status(200).json({ datas });
  } catch (error) {
      next(error);
  }
}


export {listDatas}
