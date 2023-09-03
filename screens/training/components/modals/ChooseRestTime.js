import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from 'react';
import { Pressable, View, Text } from 'react-native';


//Components
import TextAndIconButton from '../../../../buttons/TextAndIconButton';

export const ChooseRestTime = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = () => {
    hideDatePicker();
  };


  return (
    <View>
      <TextAndIconButton
        title="Choose rest time"
        iconName="timer"
        onClick={showDatePicker}
        iconSize={22}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onCancel={hideDatePicker}
        onConfirm={handleConfirm}
      />
    </View>
  );
};

export default ChooseRestTime;