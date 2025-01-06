import { PutCommand } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { randomUUID } from "node:crypto";
import { dynamoClient } from "src/lib/dynamoClient";

export async function handler(event: APIGatewayProxyEventV2) {
	const body = JSON.parse(event.body);

	const uuid = randomUUID();

	const command = new PutCommand({
		TableName: "ProductsTable",
		Item: {
			id: uuid,
			name: body.name,
			price: body.price,
			tags: body.tags,
		},
	});

	const response = await dynamoClient.send(command);

	return {
		statusCode: 200,
		body: JSON.stringify(response),
	};
}
