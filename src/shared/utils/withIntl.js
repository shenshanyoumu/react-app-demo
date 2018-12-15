import { withIntl as withIntlOrigin } from "lib-for-react-app";
import getLocale from "./getLocale";

//
export default function withIntl(page) {
  return withIntlOrigin(getLocale(), page, __HOST_CDN__);
}
