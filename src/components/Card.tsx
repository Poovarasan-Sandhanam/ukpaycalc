import React from 'react';
import { View, ViewProps, StyleProp, ViewStyle } from 'react-native';
import { cardStyles as styles } from '../styles/components/cardStyles';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Card = ({ children, style, ...props }: CardProps) => {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
};

export default Card;
