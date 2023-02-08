import { IhospitalListRes } from './model/hostipalListType';
import { request } from "@/utils/http"


export function reqGetHospitalList(
  page: number,
  limit: number,
  hosname?: string,
  hoscode?: number,
  hostype?: string,
  provinceCode?: string,
  cityCode?: string,
  districtCode?: string
) {
  return request.get<any, IhospitalListRes>(
    `/admin/hosp/hospital/${page}/${limit}`, {
    params: {
      hosname,
      hoscode,
      hostype,
      provinceCode,
      cityCode,
      districtCode,
    }
  }
  )
}