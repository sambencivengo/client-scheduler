import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../../theme';
import { InputField } from '../InputField';

interface ClientProfileEditFieldProps {
	fieldName: string;
	fieldLabel: string;
}

export const ClientProfileEditField: React.FC<ClientProfileEditFieldProps> = ({
	fieldName,
	fieldLabel,
}) => {
	return (
		<Box>
			<Text fontWeight={'bold'} color={colors.lightGreyBlue}>
				{fieldLabel}:
			</Text>

			<InputField name={fieldName} />
		</Box>
	);
};
