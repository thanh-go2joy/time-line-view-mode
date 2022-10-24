import apiCaller from '@/api/apiCaller'

export async function onExportFlashSale (params) {
  return await apiCaller.get('exports/flash-sale', { params: params })
}
