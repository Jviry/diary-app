'use client';

import { useState, useEffect } from 'react';
import { partnerService } from '@/services/partner.service'
import type { PartnerRequest } from '@/types/partner.types'

export const useManagePartner = () => {
  const [toUserId, setToUserId] = useState('')
  const [receivedRequests, setReceivedRequests] = useState<PartnerRequest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReceivedRequests = async () => {
      try {
        const result = await partnerService.getReceivedRequests()
        setReceivedRequests(result)
      } catch (error) {
        console.error('Failed to fetch requests', error)
      }
    }
    fetchReceivedRequests();
  }, [])


  const sendRequest = async () => {
    if (!toUserId.trim()) return
    setLoading(true)
    setError(null)
    try {
      await partnerService.sendRequest(toUserId)
      setToUserId('')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send request'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const acceptRequest = async (id: string) => {
    try {
      await partnerService.acceptRequest(id)
      window.location.href = '/profile'
    } catch (err) {
      console.error('Failed to accept request', err)
    }
  }

  const declineRequest = async (id: string) => {
    try {
      await partnerService.declineRequest(id)
      setReceivedRequests(prev => prev.filter(r => r.id !== id))
    } catch (err) {
      console.error('Failed to decline request', err)
    }
  }

  return {
    toUserId,
    setToUserId,
    receivedRequests,
    loading,
    error,
    sendRequest,
    acceptRequest,
    declineRequest,
  }
}
