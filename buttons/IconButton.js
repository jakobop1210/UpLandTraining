import { Pressable } from 'react-native';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';

export default function IconButton({ onClick, iconName, iconType, iconSize, iconColor }) {
  let selectedIcon = <Ionicons name={iconName} size={iconSize} color={iconColor} />;

  if (iconType === 'MaterialIcons') {
    selectedIcon = <MaterialIcons name={iconName} size={iconSize} color={iconColor} />;
  } else if (iconType === 'AntDesign') {
    selectedIcon = <AntDesign name={iconName} size={iconSize} color={iconColor} />;
  }

  return (
    <Pressable
      onPress={onClick}
      style={({ pressed }) => [
        {
          opacity: pressed
            ? 0.5
            : 1,
        },
      ]}
    >
      {selectedIcon}
    </Pressable>
  );
}

