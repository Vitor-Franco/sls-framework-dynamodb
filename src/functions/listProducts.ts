import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "src/lib/dynamoClient";

export async function handler() {
	const command = new ScanCommand({
		TableName: "ProductsTable",
	});

	const response = await dynamoClient.send(command);

	return {
		statusCode: 200,
		body: JSON.stringify(response.Items),
	};
}
