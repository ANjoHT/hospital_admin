



export interface IhospitalSetItem {
  id: number,
  createTime: string,
  updateTime: string,
  isDeleted: number,
  param: object,
  provinceCode: number,
  cityCode: number,
  districtCode: number,
  addres: string,
  logoData: string,
  intro: string,
  route: string,
  status: number,
}

export type IhospitalSets = IhospitalSetItem[]

export interface IhospitalSetsRes {
  records: IhospitalSets,
  total: number

}

export interface Iadd {
  hosname: string
  hoscode: string,
  apiUrl: string,
  contactsName: string,
  contactsPhone: number,
}

