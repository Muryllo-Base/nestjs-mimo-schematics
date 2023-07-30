import { ConfigType, registerAs } from '@nestjs/config';
import { cast } from 'typeable';

export type <%= classify(name) %>ConfigSlice = {
  apiKey: string;
  apiVersion: string;
};

export const <%= uppercase(underscore(name)) %>_CONFIG = '<%= uppercase(underscore(name)) %>_CONFIG';

export const <%= classify(name) %>Config = registerAs<<%= classify(name) %>ConfigSlice>(<%= uppercase(underscore(name)) %>_CONFIG, () => ({
  apiKey: cast(process.env.<%= uppercase(underscore(name)) %>_KEY, 'String'),
  apiVersion: cast(process.env.<%= uppercase(underscore(name)) %>_VERSION, 'String'),
}));

export type <%= classify(name) %>ConfigType = ConfigType<typeof <%= classify(name) %>Config>;
