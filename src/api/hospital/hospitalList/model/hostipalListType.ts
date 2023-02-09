
export interface IhospitalListItem {
  id: number,
  logoData: number,
  hosname: number,
  params: {
    hostypeString: string,
    fullAddress: string
  },
  createTime: string,
  status: number,
}

export interface IhospitalListParams {
  page: number
  pageSize: number
  hosname?: string
  hoscode?: string
  hostype?: string
  provinceCode?: string
  cityCode?: string
  districtCode?: string
  status?: 0 | 1
}
export type IhospitalList = IhospitalListItem[]

export interface IhospitalListRes {
  content: IhospitalList,
  totalElements: number
}

export interface IprovinceItem {
  id: number,
  createTime: string,
  updateTime: string,
  isDelete: number,
  name: string,
  value: string
}

export type IprovinceList = IprovinceItem[]

export interface Ihospital {
  id: string,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: {
    hostypeString: string,
    fullAddress: string
  },
  hoscode: number,
  hosname: string,
  hostype: number,
  provinceCoe: string,
  cityCode: string,
  districtCoe: string,
  address: string,
  logoData: string,
  intro: string,
  route: string,
  status: 0 | 1
}

export interface IbookingRule {
  cycle: number,
  releaseTime: string,
  stopTime: string,
  quitDay: number,
  quitTime: string,
  rule: string[]
}
export interface IhospitalShow {
  bookingRule?: IbookingRule,
  hospital?: Ihospital
}
