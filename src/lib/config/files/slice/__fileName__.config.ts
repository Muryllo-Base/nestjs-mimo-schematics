import { ConfigType, registerAs } from '@nestjs/config';
import { cast } from 'typeable';

export type <%= classify(name) %>ConfigSlice = {
  apiKey: string;
  apiVersion: string;
  // Put your configuration type here...
};

export const <%= uppercase(underscore(name)) %>_CONFIG = '<%= uppercase(underscore(name)) %>_CONFIG';

// Registers a configuration provider that extracts values from environment variables.
export const <%= classify(name) %>Config = registerAs<<%= classify(name) %>ConfigSlice>(<%= uppercase(underscore(name)) %>_CONFIG, () => ({
  apiKey: cast(process.env.<%= uppercase(underscore(name)) %>_KEY, 'String'),
  apiVersion: cast(process.env.<%= uppercase(underscore(name)) %>_VERSION, 'String'),
}));

// Defines a new type for the return of the configuration provider.
export type <%= classify(name) %>ConfigType = ConfigType<typeof <%= classify(name) %>Config>;
