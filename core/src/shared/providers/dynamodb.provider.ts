import { FactoryProvider, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { aws } from 'dynamoose';

export const DYNAMODB = 'DynamoDbProvider';
export const dynamodbProvider: FactoryProvider = {
  scope: Scope.DEFAULT,
  provide: DYNAMODB,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const localDynamoDbInstance = configService.get('LOCAL_DYNAMODB');

    if (localDynamoDbInstance) {
      return aws.ddb.local(localDynamoDbInstance);
    }

    const ddb = new aws.ddb.DynamoDB({
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY')!,
      },
      region: configService.get('AWS_REGION')!,
    });
    aws.ddb.set(ddb);

    return ddb;
  },
};
