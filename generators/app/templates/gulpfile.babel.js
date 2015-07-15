import './task/styles';
import './task/lint';
import './task/images';
import './task/dev';
<% if (!includeReact) { -%>
import './task/test';
<% } -%>
import './task/prod';
