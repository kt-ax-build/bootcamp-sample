import { useState, useCallback } from 'react';
import { ApplicationService } from '../services/applicationService';
import { useApplicationStore } from '../stores/applicationStore';

export const useTeamNameCheck = () => {
  const [isChecking, setIsChecking] = useState(false);
  const { setTeamNameCheckResult, clearTeamNameCheckResult } = useApplicationStore();

  const checkTeamName = useCallback(async (teamName: string) => {
    if (!teamName.trim()) {
      clearTeamNameCheckResult();
      return;
    }

    setIsChecking(true);
    try {
      const result = await ApplicationService.checkTeamName(teamName);
      setTeamNameCheckResult(result);
    } catch (error) {
      setTeamNameCheckResult({
        isAvailable: false,
        message: '팀명 확인 중 오류가 발생했습니다.',
      });
    } finally {
      setIsChecking(false);
    }
  }, [setTeamNameCheckResult, clearTeamNameCheckResult]);

  const clearResult = useCallback(() => {
    clearTeamNameCheckResult();
  }, [clearTeamNameCheckResult]);

  return {
    isChecking,
    checkTeamName,
    clearResult,
  };
};
