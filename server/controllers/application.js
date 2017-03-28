exports.get_flash = (req, res) => {
  return {
    info: req.flash('info'),
    success: req.flash('success'),
    error: req.flash('error')
  };
};