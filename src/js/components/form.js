var _     = require('lodash');
var $     = require('jquery');
var React = require('react');
var moment = require('moment');

var ExpandedForm     = require('./expanded-form');
var CondensedForm    = require('./condensed-form');
var ArticleActor     = require('../actors/article-actor');
var ArticleStore     = require('../stores/article-store');

var CountryStore = require('../stores/country-store');
var IndustryStore = require('../stores/industry-store');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      expanded : true
    };
  },
  getInitialState: function() {
    var expiration_date_start = ArticleStore.getQuery().expiration_date_start ? moment(ArticleStore.getQuery().expiration_date_start) : '' ;
    var expiration_date_end = ArticleStore.getQuery().expiration_date_end ? moment(ArticleStore.getQuery().expiration_date_end) : '' ;
    return {
      keyword               : ArticleStore.getQuery().q          || '',
      countries             : ArticleStore.getQuery().countries  || '',
      industries            : ArticleStore.getQuery().industries || '',
      expiration_date_start : expiration_date_start,
      expiration_date_end   : expiration_date_end
    };
  },
  handleSubmit: function(e) {
    var expiration_date_start = (this.state.expiration_date_start && this.state.expiration_date_end) ? this.state.expiration_date_start.format('YYYY-MM-DD') : '' ;
    var expiration_date_end = (this.state.expiration_date_start && this.state.expiration_date_end) ? this.state.expiration_date_end.format('YYYY-MM-DD') : '' ;
    var query = _.pick({
      q: this.state.keyword,
      countries: this.state.countries,
      industries: this.state.industries,
      expiration_date_start: expiration_date_start,
      expiration_date_end: expiration_date_end
    }, _.identity);
    this.props.history.pushState(
      query, '/search', query);
  },
  handleKeywordChange: function(e) {
    this.setState({ keyword: e.target.value });
  },
  handleCountryChange: function(values) {
    this.setState({ countries: values });
  },
  handleIndustryChange: function(values) {
    this.setState({ industries: values });
  },
  handleExpirationDateStartChange: function(date) {
    this.setState({ expiration_date_start: date });
  },
  handleExpirationDateEndChange: function(date) {
    this.setState({ expiration_date_end: date });
  },

  view: function() {
    var props = {
      keyword                     : this.state.keyword,
      countries                   : this.state.countries,
      industries                  : this.state.industries,
      expiration_date_start       : this.state.expiration_date_start,
      expiration_date_end         : this.state.expiration_date_end,
      onKeywordChange             : this.handleKeywordChange,
      onCountryChange             : this.handleCountryChange,
      onIndustryChange            : this.handleIndustryChange,
      onExpirationDateStartChange : this.handleExpirationDateStartChange,
      onExpirationDateEndChange   : this.handleExpirationDateEndChange,
      onSubmit                    : this.handleSubmit
    };
    if (!this.props.expanded) {
      return <CondensedForm {...props} />;
    } else {
      return <ExpandedForm {...props} />;
    }
  },
  render: function() {
    return this.view();
  }
});
