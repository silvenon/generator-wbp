import './task/scripts';
import './task/styles';
import './task/images';
import './task/dev';
<% if (!includeReact) { -%>
import './task/test';
<% } -%>
import './task/prod';
