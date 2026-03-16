import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

export function AppInput(props: TextInputProps) {
  const { style, ...rest } = props;
  return <TextInput placeholderTextColor="#7D7A73" style={[styles.input, style]} {...rest} />;
}

const styles = StyleSheet.create({
  input: {
    minHeight: 52,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D7D2CA',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#19324A',
    fontSize: 15,
  },
});
