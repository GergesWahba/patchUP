import { Pressable, StyleSheet, Text, View } from 'react-native';

export type ChipOption = {
  label: string;
  value: string;
};

export function ChoiceChips({
  options,
  selectedValues,
  multiple = false,
  onChange,
}: {
  options: ChipOption[];
  selectedValues: string[];
  multiple?: boolean;
  onChange: (next: string[]) => void;
}) {
  return (
    <View style={styles.wrapper}>
      {options.map((option) => {
        const selected = selectedValues.includes(option.value);

        return (
          <Pressable
            key={option.value}
            onPress={() => {
              if (multiple) {
                onChange(
                  selected
                    ? selectedValues.filter((value) => value !== option.value)
                    : [...selectedValues, option.value],
                );
              } else {
                onChange([option.value]);
              }
            }}
            style={[styles.chip, selected ? styles.selectedChip : null]}
          >
            <Text style={[styles.label, selected ? styles.selectedLabel : null]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D7D2CA',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  selectedChip: {
    backgroundColor: '#19324A',
    borderColor: '#19324A',
  },
  label: {
    color: '#19324A',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedLabel: {
    color: '#FFFFFF',
  },
});
