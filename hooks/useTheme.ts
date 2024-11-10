import {dark, light} from '../constants/themes';
import {useAppSelector} from '../store';

export const useTheme = () => {
  const themeColor = useAppSelector(state => state.theme.color);

  return themeColor === 'dark' ? dark : light;
};
