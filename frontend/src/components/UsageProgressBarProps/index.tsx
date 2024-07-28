import { Box, Progress, Text } from "@chakra-ui/react";

interface UsageProgressBarProps {
    label: string;
    value: number;
    limit: number;
}

const UsageProgressBar: React.FC<UsageProgressBarProps> = ({ label, value, limit }) => {
    const percentage = (value / limit) * 100;

    const controlColorScheme = () => {
        if (percentage >= 90) return "red";
        if (percentage >= 70) return "orange";
        return "teal";
    };

    return (
        <Box width="100%" mb={4}>
            <Text mb={2}>{label}</Text>
            <Progress colorScheme={controlColorScheme()} size="lg" value={percentage} />
            <Text mt={2}>{`${value} / ${limit} (${percentage.toFixed(2)}%)`}</Text>
        </Box>
    );
};

export default UsageProgressBar;
