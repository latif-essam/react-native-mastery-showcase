import React from 'react';
import {
  Animated,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface RotatingImageProps {
  source: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  duration?: number;
  clockwise?: boolean;
}

const RotatingImage: React.FC<RotatingImageProps> = ({
  source,
  style,
  duration = 3000,
  clockwise = true,
}) => {
  const [rotation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: duration,
          useNativeDriver: true,
        }),
      ).start();
    };

    startRotation();
    return () => rotation.setValue(0);
  }, [duration, rotation]);

  return (
    <Animated.Image
      source={source}
      style={[
        {
          transform: [
            {
              rotate: rotation.interpolate({
                inputRange: [0, 1],
                outputRange: clockwise
                  ? ['0deg', '360deg']
                  : ['360deg', '0deg'],
              }),
            },
          ],
        },
        style,
      ]}
    />
  );
};

export default RotatingImage;
