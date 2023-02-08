import { Iadd } from './model/hostipalSetTypes';
import { IhospitalSetItem, IhospitalSetsRes } from '@/api/hospital/hospitalSet/model/hostipalSetTypes';
import { request } from "@utils/http"
import { Key } from 'react'

export function reqGetHospitalSets(
  page: number,
  limit: number,
  hoscode?: number,
  hosname?: string
) {
  return request.get<any, IhospitalSetsRes>(
    `/admin/hosp/hospitalSet/${page}/${limit}`, {
    params: {
      hosname,
      hoscode
    }
  }
  )
}

export function reqDelHospitalSets(ids: Key[]) {
  return request.delete<any, null>(
    `/admin/hosp/hospitalSet/batchRemove`,
    {
      data: ids
    }
  )
}

export function reqAddHospitalSets(data: Iadd) {
  return request.post<any, null>(
    `/admin/hosp/hospitalSet/save`, data
  )
}

export function reqDelHospitalSet(id: number) {
  return request.delete<any, null>(
    `/admin/hosp/hospitalSet/remove/${id}`
  )
}

export function reqGetHospitalSet(id: number) {
  return request.get<any, IhospitalSetItem>(
    `/admin/hosp/hospitalSet/get/${id}`
  )
}

export function reqUpdateHospitalSet(values: IhospitalSetItem) {
  return request.put<any, null>(
    `/admin/hosp/hospitalSet/update`, values
  )
}