import api from "@/lib/api";
import { PartnerRequest } from "@/types/partner.types";

export const partnerService = {
  async remove() {
    await api.delete('/partner');
  },

  async sendRequest(toUserId: string) {
    const { data } = await api.post('/partner/request', { toUserId });
    return data.partnerRequest;
  },

  async getReceivedRequests(): Promise<PartnerRequest[]> {
    const { data } = await api.get('/partner/request/received');
    return data.partnerRequests;
  },

  async acceptRequest(id: string) {
    const { data } = await api.put(`/partner/request/${id}/accept`);
    return data.partnerRequest;
  },

  async declineRequest(id: string) {
    const { data } = await api.delete(`/partner/request/${id}`);
    return data;
  },

  async cancelRequest(id: string) {
    const { data } = await api.delete(`/partner/request/${id}`);
    return data;
  },
}
