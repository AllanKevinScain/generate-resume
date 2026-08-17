import { useAuth } from '@/hooks';
import { educationService } from '@/services/education';
import { profileService } from '@/services/profile';
import { useQuery } from '@tanstack/react-query';

export function useProfileData() {
  const { user } = useAuth();
  const userId = user?.id ?? '';

  const profileQuery = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => profileService.get(userId),
    enabled: Boolean(userId),
  });

  const educationsQuery = useQuery({
    queryKey: ['educations', userId],
    queryFn: () => educationService.list(userId),
    enabled: Boolean(userId),
  });

  return {
    userId,
    profileQuery,
    educationsQuery,
  };
}
