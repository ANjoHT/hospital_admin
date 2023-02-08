
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

export type IhospitalList = IhospitalListItem[]

export interface IhospitalListRes {
  content: IhospitalList,
  totalElements: number
}