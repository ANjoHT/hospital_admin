import { IhospitalListRes, IprovinceList, IhospitalListParams, IhospitalShow } from './model/hostipalListType';
import { request } from "@/utils/http"


export function reqGetHospitalList(
  { page,
    pageSize,
    hosname,
    hoscode,
    hostype,
    provinceCode,
    cityCode,
    districtCode,
    status,
  }: IhospitalListParams) {
  return request.get<any, IhospitalListRes>(
    `/admin/hosp/hospital/${page}/${pageSize}`, {
    params: {
      hosname,
      hoscode,
      hostype,
      provinceCode,
      cityCode,
      districtCode,
      status
    }
  }
  )
}

export function reqUpdateHospitalStatus(id: number, status: number) {
  return request.get<any, null>(
    `/admin/hosp/hospital/updateStatus/${id}/${status}`
  )
}

export function reqGetProvinceList(province: string = 'province') {
  return request.get<any, IprovinceList>(
    `/admin/cmn/dict/findByDictCode/${province}`
  )
}

export function reqGetCityOrDistrictList(parentId: string) {
  return request.get<any, IprovinceList>(
    `/admin/cmn/dict/findByParentId/${parentId}`
  )
}

export function reqGetHospitalShow(id: string) {
  return request.get<any, IhospitalShow>(
    `/admin/hosp/hospital/show/${id}`
  )
}