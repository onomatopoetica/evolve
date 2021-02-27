module.export = function(sequelize, DataTypes) {
    var Exercise = sequelize.define("Exercise", {
        name: DataTypes.STRING
    });

    Exercise.associate = function(models) {
        Exercise.hasMany(models.Post, {
            onDelete: "cascade"
        });
    };

    return Exercise;
};